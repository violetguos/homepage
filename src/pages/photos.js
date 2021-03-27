import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

import Layout from "../components/layout"
import SEO from "../components/seo.js"

const CustomFooter = ({ innerProps, isModal, currentView }) => isModal ?
  (
    <a
      rel="noreferrer"
      target="_blank"
      href={`https://www.flickr.com/photos/beratbozkurt0/${currentView.id}`}
      className="footer-btn"
      {...innerProps}>
      Flickr'da Görüntüle
    </a>
  ) : null;

const Photos = ({ data, location }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const photoList = data.photos.edges

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <Layout location={location} title="Berat About">
      <SEO title="Fotoğraflar" />
      <Gallery photos={photoList.map(({ node }) => ({ src: node.url_c, width: node.width_c, height: node.height_c }))} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              components={{ FooterCaption: CustomFooter }}
              currentIndex={currentImage}
              views={photoList.map(({ node }) => ({ source: node.url_c, id: node.photo_id }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Layout>
  )
}

export default Photos


export const photoQuery = graphql`
  query {
    site {
      siteMetadata {
        social {
          flickr
        }
      }
    }
    photos: allFlickrPhoto {
      edges {
        node {
          id
          title
          photo_id
          description
          url_c
          width_c
          height_c
        }
      }
    }
  }
`
