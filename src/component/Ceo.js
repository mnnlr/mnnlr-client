import React from 'react';
import img1 from '../assets/ceo.jpg';

function Ceo() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>"Amazing Designs and Quality Work!"</h1>
      <div style={styles.textContainer}>
        <p style={styles.text}>
          Nam at congue diam. Etiam erat lectus, finibus eget commodo quis, tincidunt eget leo. Nullam quis vulputate orci, ac accumsan quam. Morbi fringilla congue libero, ac malesuada vulputate pharetra.
        </p>
      </div>
      <div style={styles.imageContainer}>
        <img style={styles.image} src={img1} alt="CEO" />
      </div>
      <h4 style={styles.name}>John Doe</h4>
      <p style={styles.position}>CEO, ACME INC.</p>
      {/* <ContactCard /> */}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: '0 auto',
    padding: '2rem 1rem',
    backgroundColor: 'rgb(239, 242, 255)',
  },
  title: {
    color: 'rgb(36, 42, 86)',
  },
  textContainer: {
    maxWidth: '50%',
    margin: '0 auto',
    alignItems: 'center',
  },
  text: {
    color: 'rgb(36, 42, 86)',
  },
  imageContainer: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '20px auto',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  name: {
    color: 'rgb(36, 42, 86)',
  },
  position: {
    color: 'rgb(36, 42, 86)',
  },
};

export default Ceo;
