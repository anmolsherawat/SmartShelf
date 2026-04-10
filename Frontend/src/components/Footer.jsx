import React from "react";

function Footer() {
  return (
    <div>
      <hr />
      <footer className="footer footer-center p-4 text-base-content rounded dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover" href="/about">
            About us
          </a>
        </nav>
        <aside>
          <p>
            Copyright © 2026 — All rights reserved by Anmol Sherawat.
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
