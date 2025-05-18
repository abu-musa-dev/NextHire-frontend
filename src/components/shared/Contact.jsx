import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your message has been sent successfully.",
      timer: 2500,
      showConfirmButton: false,
    });

    // ফর্ম রিসেট
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | NextHire</title>
        <meta
          name="description"
          content="Reach out to NextHire for support, inquiries, or questions. We're here to help!"
        />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Have a question or need more information? Just drop us a line!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold">Phone number</h4>
              <p className="text-gray-700">(00) 723 445 793</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Email address</h4>
              <p className="text-gray-700">hello@uxper.co</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Address</h4>
              <p className="text-gray-700">2866 Oakway Lane, New York, USA</p>
            </div>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.1463006105027!2d-78.63650908452845!3d42.98451387914717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d374174dbf79cf%3A0xe05f1397ac0b4ea!2sOakway%20Ln%2C%20New%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1715941229264!5m2!1sen!2sbd"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>

          {/* Right Side - Form */}
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold mb-4">Send us a message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-1/2 px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Lastname"
                  className="w-1/2 px-4 py-2 border rounded"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full px-4 py-2 border rounded"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
