import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./PageTemplate.scss";

function PageTemplate(props) {
  const { title, heading, size, children } = props;

  useEffect(() => {
    document.title = `${title} | Demo Site`;
  }, [title]);

  const desktopColSize =
    size === "lg" ? { span: 8, offset: 2 } : { span: 6, offset: 3 };

  return (
    <div className="page">
      <Container>
        <Row>
          <Col xs={12} md={desktopColSize}>
            <h1 className="page-header">{heading}</h1>
            <Card className="page-card">
              <Card.Body>{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PageTemplate;
