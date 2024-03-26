import React from "react";

import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <div>
      <h2>Cookie Policy</h2>
      <p>
        This Cookie Policy explains how we use cookies and similar tracking
        technologies when you visit our website. By continuing to browse the
        Website, you agree to our use of cookies as described in this policy.
      </p>
      <h3>1. What Are Cookies?</h3>
      <p>
        Cookies are small text files that are stored on your device (computer,
        smartphone, tablet) when you visit a website. They are widely used to
        make websites work more efficiently and provide information to website
        owners.
      </p>
      <h3>2. How We Use Cookies</h3>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li>
          <strong>Cart Identifier Cookie:</strong> We set a cookie on your
          device to store a unique identifier for your shopping cart. This
          identifier helps us track your cart contents and provide a seamless
          shopping experience.
        </li>
        <li>
          <strong>Embedded Content Cookies:</strong> We may embed content from
          third-party platforms such as Instagram on the Website. Cookies from
          these third-party platforms are only set if you choose to interact
          with the embedded content and accept cookies on the respective
          platform. Please note that these cookies are subject to the privacy
          and cookie policies of the third-party platforms, such as Instagram.
          For more information on how these platforms use cookies, please refer
          to their respective policies.
        </li>
      </ul>

      <h3>3. Managing Cookies</h3>
      <p>
        You can manage your cookie preferences through your web browser
        settings. Each browser is different, so please refer to your browser's
        help menu for instructions on how to manage cookies.
      </p>
      <h3>4. Changes to This Policy</h3>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for other operational, legal, or regulatory reasons. We
        encourage you to review this policy periodically for any updates.
      </p>
      <h3>5. Contact Us</h3>
      <p>
        If you have any questions about this Cookie Policy or our use of
        cookies, please contact us at <Link to="/contact">Contact Form</Link>
      </p>
    </div>
  );
};

export default CookiePolicy;
