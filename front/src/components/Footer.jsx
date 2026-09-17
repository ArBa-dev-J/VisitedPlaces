function Footer() {
  return (
    <>
      <hr />

      <footer className="px-8 pb-12 mt-9">
        <div>
          <h3 className="text-center font-bold text-[1.2rem]">
            Visited Places
          </h3>
          <p className="text-center pb-2">
            Providing quality services and solutions for everyone.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center gap-57 2xl:gap-180 rounded-3xl bg-white shadow-lg pt-2 pb-2">
            <h4 className="font-bold text-[1.2rem]">Quick Links</h4>
            <ol className="list-disc">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ol>
          </div>
        </div>

        <div className="pt-2 pb-2">
          <h4 className="text-center font-bold text-[1.2rem]">
            Contact Information
          </h4>
          <p className="text-center">Email: info@example.com</p>
          <p className="text-center">Phone: +1 234 567 890</p>
          <p className="text-center">Address: 123 Main Street, City, Country</p>
        </div>
        
        <h4 className="text-center pb-2 font-bold text-[1.2rem]">Follow Us</h4>
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center gap-11 2xl:gap-87 pt-2 pb-2 rounded-3xl bg-white shadow-lg">
            <a href="#">Facebook</a> <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
