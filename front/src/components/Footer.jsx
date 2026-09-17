function Footer() {
  return (
    <>
      <footer>
        <h3>Company Name</h3>
        <p>Providing quality services and solutions for everyone.</p>

        <div className="flex justify-around">
          <h4>Quick Links</h4>
          <ol className="list-disc">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="about.html">About Us</a>
            </li>
            <li>
              <a href="services.html">Services</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ol>
        </div>

        <h4>Contact Information</h4>
        <p>Email: info@example.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Main Street, City, Country</p>
        <h4>Follow Us</h4>
        <a href="#">Facebook</a> |<a href="#">Instagram</a> |
        <a href="#">Twitter</a>
        <hr></hr>
        <p>&copy; 2026 Company Name. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
