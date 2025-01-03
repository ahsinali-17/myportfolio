import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("PENDING");
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId =  import.meta.env.VITE_TEMPLATE_ID;
    const userId = import.meta.env.VITE_PUBLIC_KEY; 
    emailjs
      .send(serviceId, templateId, formData, userId)
      .then((response) => {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setStatus("FAILED");
      });
  };

  return (
    <main className="mb-6 min-h-[60vh] text-center0vh] text-white">
      
    <section className="sixth my-[10vh] min-h-[60vh]">

          <h1 className="text-4xl font-semibold w-5/6 mx-auto mb-4">Contact Me</h1>
          <form className="flex flex-col items-center justify-center gap-3 mt-6 min-h-[50vh] w-5/6 mx-auto" onSubmit={handleSubmit}>
           <input name="email" type="email" placeholder='Your Email*' className='bg-transparent placeholder-gray-400 border border-violet-400 text-white p-2 rounded-md w-full'  value={formData.email}
        onChange={handleChange}
        required/>
           <input name="name" type="text" placeholder='Your Name*' className='bg-transparent placeholder-gray-400 border border-violet-400 text-white p-2 rounded-md w-full' value={formData.name}
        onChange={handleChange}
        required/>
           <input name="subject" type="text" placeholder='Subject*' className='bg-transparent placeholder-gray-400 border border-violet-400 text-white p-2 rounded-md w-full'   value={formData.subject}
        onChange={handleChange}
        required/>
            <textarea name="message" placeholder='Message*' rows={5} className='bg-transparent placeholder-gray-400 border border-violet-400 text-white p-2 rounded-md w-full'  value={formData.message}
        onChange={handleChange}
        required/>
            <button className='bg-violet-400 hover:scale-110 hover:bg-violet-600 text-white font-semibold w-1/3 py-2 rounded-md' type="submit" disabled={status==='PENDING'? true : false}>{status==='PENDING'? "Sending..." :"Send"}</button>
          </form>
          {status === "SUCCESS" && (
        <p className="text-green-400 mt-60] text-center">Message sent successfully!</p>
      )}
      {status === "FAILED" && (
        <p className="text-red-400 mt-60] text-center">Failed to send message. Please try again.</p>
      )}
        </section>
        <footer className="flex justify-center items-center bg-gray-500 absolute bottom-4 w-full">
          <span>
            <span className="text-red-600 font-semibold">AA</span>portfolio
            &#169; 2024. All rights reserved.
          </span>
        </footer>
      </main>
  );
};

export default ContactForm;
