/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_CHARACTERS } from '../graphql/queries';
import { Container, Row, Col, Card, Form, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBeer } from 'react-icons/fa';
import './style.css'
const CharacterList = () => {
  const { t } = useTranslation(); // Use translation hook to get the translation function

  // Initialize the filters state with default values
  const [filters, setFilters] = useState({
    status: '',  // Can be '', 'Alive', 'Dead', or 'unknown'
    species: '', // Can be '', 'Human', 'Alien', etc.
    name: '',    // Filter by name
    origin: '',  // Filter by origin
  });

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      status: filters.status,
      species: filters.species,
      name: filters.name,  // Use name filter
      origin: filters.origin, // Use origin filter
    },
    // Do not skip based on filters, always fetch characters
  });

  const fetchMoreCharacters = () => {
    if (data?.characters.info.next) {
      fetchMore({
        variables: { page: data.characters.info.next, status: filters.status, species: filters.species, name: filters.name, origin: filters.origin },
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter the characters based on status, species, name, and origin
  const filteredCharacters = data?.characters.results.filter((char) => {
    const matchesStatus = filters.status ? char.status === filters.status : true;
    const matchesSpecies = filters.species ? char.species === filters.species : true;
    const matchesName = filters.name ? char.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const matchesOrigin = filters.origin ? char.origin.name.toLowerCase().includes(filters.origin.toLowerCase()) : true;
    return matchesStatus && matchesSpecies && matchesName && matchesOrigin;
  });

  // Create options for Name and Origin from the fetched data
  const nameOptions = Array.from(new Set(data?.characters.results.map((char) => char.name)));
  const originOptions = Array.from(new Set(data?.characters.results.map((char) => char.origin.name)));

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("Loading...")}</span> {/* Translated loading text */}
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{t("Error")}: {error.message}</Alert> {/* Translated error message */}
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">{t("Rick and Morty")}</h1> {/* Translated title */}

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="statusFilter">
            <Form.Label>{t("Status")}</Form.Label> {/* Translated label */}
            <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">{t("All Status")}</option> {/* Translated option */}
              <option value="Alive">{t("Alive")}</option> {/* Translated option */}
              <option value="Dead">{t("Dead")}</option> {/* Translated option */}
              <option value="unknown">{t("Unknown")}</option> {/* Translated option */}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="speciesFilter">
            <Form.Label>{t("Species")}</Form.Label> {/* Translated label */}
            <Form.Select name="species" value={filters.species} onChange={handleFilterChange}>
              <option value="">{t("All Species")}</option> {/* Translated option */}
              <option value="Human">{t("Human")}</option> {/* Translated option */}
              <option value="Alien">{t("Alien")}</option> {/* Translated option */}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          {/* Filter by Name */}
          <Form.Group controlId="nameFilter">
            <Form.Label>{t("Name")}</Form.Label> {/* Translated label */}
            <Form.Select name="name" value={filters.name} onChange={handleFilterChange}>
              <option value="">{t("All Names")}</option> {/* Translated option */}
              {nameOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Filter by Origin */}
          <Form.Group controlId="originFilter" className="mt-2">
            <Form.Label>{t("Origin")}</Form.Label> {/* Translated label */}
            <Form.Select name="origin" value={filters.origin} onChange={handleFilterChange}>
              <option value="">{t("All Origins")}</option> {/* Translated option */}
              {originOptions.map((origin) => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Character List */}
      <InfiniteScroll
        dataLength={filteredCharacters?.length || 0}
        next={fetchMoreCharacters}
        hasMore={!!data?.characters.info.next}
        loader={
          <div className="text-center my-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t("Loading more...")}</span> {/* Translated loading message */}
            </Spinner>
          </div>
        }
      >
        <Row>
          {filteredCharacters?.map((char) => (
            <Col md={4} sm={6} className="mb-4" key={char.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{char.name}</Card.Title>
                  <Card.Text>
  <strong>{t("Status")}:</strong> {t(char.status)} <br />
  <strong>{t("Species")}:</strong> {t(char.species)} <br />
  <strong>{t("Gender")}:</strong> {t(`gender.${char.gender}`) || t("Unknown")} <br />
  <strong>{t("Origin")}:</strong> {char.origin.name ? t(char.origin.name) : t("Unknown")}
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
