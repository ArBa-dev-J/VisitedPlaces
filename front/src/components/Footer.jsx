function Footer() {
  return (
    <>
      <footer>
        <h3 className="text-center">Company Name</h3>
        <p className="text-center">
          Providing quality services and solutions for everyone.
        </p>

        <div className="flex justify-center gap-57">
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

        <h4 className="text-center">Contact Information</h4>
        <p className="text-center">Email: info@example.com</p>
        <p className="text-center">Phone: +1 234 567 890</p>
        <p className="text-center">Address: 123 Main Street, City, Country</p>
        <h4 className="text-center">Follow Us</h4>

        <div className="flex justify-center gap-11">
          <a href="#">Facebook</a> <a href="#">Instagram</a> 
          <a href="#">Twitter</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
