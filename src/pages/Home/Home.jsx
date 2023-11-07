// import { useState } from "react"
import Image from "react-bootstrap/Image"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import './styles/home.css'

import PostCard from "./PostCard"
import Footer from "../../components/layout/Footer/Footer"
import NavBar from "../../components/layout/Navigation/Navbar/NavBar"


export default function Landing() {
  // Delete this when we are consuming the API
  //TODO: Add pagination
  // let posts = ['First post', 'Second post', 'Third post', 'Fourth post',
  //   'Fifth post', 'Sixth post', 'Seventh post', 'Eight post'];
  let posts = ['First post', 'Second post', 'Third post', 'Fourth post'];
  return (
    <>
      <NavBar />
      <Row>
        {/* Big image */}
        <Col className="border border-1 cover">
          <Image src="https://picsum.photos/1366/480" fluid />
        </Col>
      </Row>
      <Row id="courses-info" className="justify-content-center">
        {/* Courses information links */}
        <Col xs lg={3} className="d-flex justify-content-center">
          <Button variant="link" className="text-decoration-none">Oferta académica</Button>
          <Button variant="link" className="text-decoration-none">Cursos de extensión</Button>
        </Col>
      </Row>
      <Row>
        {/* Posts entry  */}
        <Col xs={12} md={12} lg={12} className="py-4">
          <h2 className="text-center"><strong>Actualizate sobre la universidad</strong></h2>
        </Col>
        <Col xs={12} md={12} lg={12} className="px-5">
          <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tenetur architecto repellat ut ex! Ad commodi sit blanditiis consectetur assumenda similique molestias ducimus iure</p>
        </Col>
      </Row>
      <Row className="justify-content-center py-4">
        {/* Posts list */}
        <Col xs={12} md={12} lg={8} className="d-flex flex-wrap justify-content-between">
          {posts.map((post, index) => <PostCard key={index} title={post} />)}
        </Col>
      </Row>
      <Footer />

    </>
  )
}
