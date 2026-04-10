import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }

    // No backend endpoint yet: show confirmation and clear the form.
    toast.success("Thanks for contacting us. We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-12">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
              Contact Us
            </h1>
            <p className="mt-4 text-base md:text-lg text-center md:text-left">
              Have a question or feedback? Send us a message and we will respond as
              soon as possible.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 p-6 rounded-xl bg-base-100 shadow dark:bg-slate-900"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input
                    className="input input-bordered w-full"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="form-control mt-4">
                <div className="label">
                  <span className="label-text">Message</span>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full min-h-[140px]"
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Write your message..."
                />
              </label>

              <div className="mt-6 flex justify-center md:justify-start">
                <button className="btn btn-secondary">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
