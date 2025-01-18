import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_CHARACTERS } from '../graphql/queries';
import { Container, Row, Col, Card, Form, Spinner, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMale, FaFemale, FaSkull, FaMedkit, FaQuestionCircle, FaUserAlt, FaRobot, FaGlobeAmericas } from 'react-icons/fa'; // Added FaGlobeAmericas for Origin
import { FaFilter, FaTimes, FaSortAlphaDown, FaSortAlphaUp, FaRandom } from 'react-icons/fa';

import './style.css';

const CharacterList = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    status: [],
    species: [],
    name: '',
    origin: '',
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortField, setSortField] = useState('name'); 
  const [isRandom, setIsRandom] = useState(false);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      status: appliedFilters.status.join(','),
      species: appliedFilters.species.join(','),
      name: appliedFilters.name,
      origin: appliedFilters.origin,
      sortOrder: isRandom ? 'random' : sortOrder, 
      sortField: isRandom ? 'name' : sortField, 
    },
  });

  const fetchMoreCharacters = () => {
    if (data?.characters.info.next) {
      fetchMore({
        variables: {
          page: data.characters.info.next, // Get the next page from the API response
          status: appliedFilters.status.join(','),
          species: appliedFilters.species.join(','),
          name: appliedFilters.name,
          origin: appliedFilters.origin,
          sortOrder: isRandom ? 'random' : sortOrder,
          sortField: isRandom ? 'name' : sortField, // For random sorting
        },
        // After fetching the data, merge the new data with the previous data
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
  
          return {
            characters: {
              ...prevResult.characters,
              results: [
                ...prevResult.characters.results, // Keep the previous results
                ...fetchMoreResult.characters.results, // Add the new results
              ],
              info: fetchMoreResult.characters.info, // Update the pagination info (next page)
            },
          };
        },
      });
    }
  };
  

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[name]) {
        updatedFilters[name] = [];
      }

      if (checked) {
        if (!updatedFilters[name].includes(value)) {
          updatedFilters[name] = [...updatedFilters[name], value];
        }
      } else {
        updatedFilters[name] = updatedFilters[name].filter((v) => v !== value);
      }

      return updatedFilters;
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      species: [],
      name: '',
      origin: '',
    });
    setAppliedFilters({
      status: [],
      species: [],
      name: '',
      origin: '',
    });
  };
  
  const handleSortOrderChange = (field) => {
    if (field === sortField) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc'); 
    }
    setIsRandom(false); 
  };
  

  const handleRandomSort = () => {
    setIsRandom(true); // Enable random sorting
    setSortField('name'); // Keep sorting by name, but in random order
    setSortOrder('random'); // Random order
  };
  const filteredCharacters = data?.characters.results.filter((char) => {
    const matchesStatus = appliedFilters.status.length ? appliedFilters.status.includes(char.status) : true;
    const matchesSpecies = appliedFilters.species.length ? appliedFilters.species.includes(char.species) : true;
    const matchesName = appliedFilters.name ? char.name.toLowerCase().includes(appliedFilters.name.toLowerCase()) : true;
    const matchesOrigin = appliedFilters.origin ? char.origin.name.toLowerCase().includes(appliedFilters.origin.toLowerCase()) : true;
    return matchesStatus && matchesSpecies && matchesName && matchesOrigin;
  });

  const sortedCharacters = filteredCharacters?.sort((a, b) => {
    if (isRandom) {
      // If 'isRandom' is true, shuffle the characters randomly
      return Math.random() - 0.5;
    } else {
      // No random sort, apply the selected sort field and order
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'origin') {
        return sortOrder === 'asc'
          ? a.origin.name.localeCompare(b.origin.name)
          : b.origin.name.localeCompare(a.origin.name);
      }
    }
    return 0;
  });
  
  
  

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("Loading...")}</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{t("Error")}: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ backgroundImage: `url('../assets/background.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: '20px' }}>
      {/* Title Section */}
      <Row>
        <Col>
          <h1 className="text-center my-4">{t("Rick and Morty")}</h1>
        </Col>
      </Row>

      {/* Filters Section */}
      <Container className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="statusFilter">
              <Form.Label>{t("Filter by Status")}</Form.Label>
              <Form.Check
                type="checkbox"
                label={t("Alive")}
                value="Alive"
                name="status"
                checked={filters.status.includes('Alive')}
                onChange={handleFilterChange}
              />
              <Form.Check
                type="checkbox"
                label={t("Dead")}
                value="Dead"
                name="status"
                checked={filters.status.includes('Dead')}
                onChange={handleFilterChange}
              />
              <Form.Check
                type="checkbox"
                label={t("Unknown")}
                value="unknown"
                name="status"
                checked={filters.status.includes('unknown')}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="speciesFilter">
              <Form.Label>{t("Filter by Species")}</Form.Label>
              <Form.Check
                type="checkbox"
                label={t("Human")}
                value="Human"
                name="species"
                checked={filters.species.includes('Human')}
                onChange={handleFilterChange}
              />
              <Form.Check
                type="checkbox"
                label={t("Alien")}
                value="Alien"
                name="species"
                checked={filters.species.includes('Alien')}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex flex-column justify-content-end align-items-start">
            <Button variant="primary" size="sm" onClick={handleApplyFilters} className="mb-2 d-flex align-items-center">
              <FaFilter className="me-2" /> {t("Apply Filters")}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleClearFilters} className="d-flex align-items-center">
              <FaTimes className="me-2" /> {t("Clear Filters")}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Sorting Section */}
      <Container className="mb-4">
        <Row>
          <Col md={3}>
          <Button variant="outline-secondary" onClick={() => handleSortOrderChange('name')} className="d-flex align-items-center">
  {sortOrder === 'asc' && sortField === 'name' ? (
    <>
      <FaSortAlphaDown className="me-2" /> {t('Sort by Name A-Z')}
    </>
  ) : (
    <>
      <FaSortAlphaUp className="me-2" /> {t('Sort by Name Z-A')}
    </>
  )}
</Button>
<Button variant="outline-secondary" onClick={() => handleSortOrderChange('origin')} className="d-flex align-items-center">
  {sortOrder === 'asc' && sortField === 'origin' ? (
    <>
      <FaSortAlphaDown className="me-2" /> {t('Sort by Origin A-Z')}
    </>
  ) : (
    <>
      <FaSortAlphaUp className="me-2" /> {t('Sort by Origin Z-A')}
    </>
  )}
</Button>

          </Col>
          <Col md={3}>
            <Button variant="outline-warning" onClick={handleRandomSort} className="d-flex align-items-center">
              <FaRandom className="me-2" /> {t('Show Random')}
            </Button>
          </Col>
        </Row>
      </Container>


{/* Character List Section */}
<InfiniteScroll
  dataLength={sortedCharacters?.length || 0} 
  next={fetchMoreCharacters}  // Function to load more characters when user scrolls
  hasMore={!!data?.characters?.info?.next} 
  loader={(
    <div className="text-center my-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t("Loading more...")}</span>
      </Spinner>
    </div>
  )}
  scrollThreshold={0.95} 
>
  <Row>
    {filteredCharacters?.map((char) => (
      <Col md={4} sm={6} className="mb-4" key={char.id}>
        <Card className="h-100">
          <Card.Body>
            <Card.Title>{char.name}</Card.Title>
            <Card.Text>
              {/* Status */}
              <div className="d-flex align-items-center mb-2">
                <strong>{t("Status")}: </strong>
                <span className="ms-2 d-flex align-items-center">
                  {char.status === "Alive" && <FaMedkit className="text-success icon-size me-1" />}
                  {char.status === "Dead" && <FaSkull className="text-danger icon-size me-1" />}
                  {char.status === "unknown" && <FaQuestionCircle className="text-warning icon-size me-1" />}
                  {t(char.status)}
                </span>
              </div>

              {/* Species */}
              <div className="d-flex align-items-center mb-2">
                <strong>{t("Species")}: </strong>
                <span className="ms-2 d-flex align-items-center">
                  {char.species === "Human" && <FaUserAlt className="icon-size me-1" />}
                  {char.species === "Alien" && <FaRobot className="icon-size me-1" />}
                  {t(char.species)}
                </span>
              </div>

           {/* Gender */}
<div className="d-flex align-items-center mb-2">
  <strong>{t("Gender")}: </strong>
  <span className="ms-2 d-flex align-items-center">
    {char.gender === "Male" && <FaMale className="icon-size me-1" />}
    {char.gender === "Female" && <FaFemale className="icon-size me-1" />}
    {char.gender === "unknown" && <FaQuestionCircle className="text-warning icon-size me-1" />} 
    {t(`gender.${char.gender}`, { defaultValue: t("Unknown") })}
  </span>
</div>

{/* Origin */}
<div className="d-flex align-items-center mb-2">
  <strong>{t("Origin")}: </strong>
  <span className="ms-2 d-flex align-items-center">
    <FaGlobeAmericas className="icon-size me-1" />
    {char.origin.name ? t(char.origin.name) : <FaQuestionCircle className="text-warning icon-size" />} 
  </span>
</div>

            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</InfiniteScroll>



    </Container>
  );
};

export default CharacterList;
