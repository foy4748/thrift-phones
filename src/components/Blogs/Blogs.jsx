const AppName = import.meta.env.VITE_AppName;

import { useEffect } from "react";

import { Container } from "react-bootstrap";
import styles from "./Blogs.module.css";

export default function Blogs() {
  useEffect(() => {
    window.document.title = `${AppName} || Blogs`;
  }, []);
  return (
    <Container>
      <h1>Blogs</h1>
      <div className={styles.blogContainer}>
        <div className="mb-5"></div>
        <div className={styles.singleBlog}>
          <h1>1. Difference between SQL and NoSQL</h1>
          <div className={styles.answer}>
            <h2>SQL</h2>
            <p className={styles.answer}>
              SQL stands for <strong>Structured Query Language.</strong> This is
              used to query a database which has a predefined structure of data
              tables, that maintains a relation between them. Instead of
              replicating any String type information, their unique instance are
              stored in separate tables. Each row of the string contains a
              primary index and a foreign key which points to a row of another
              table. SQL is used to write a query which <strong>JOINS</strong>{" "}
              the foreign key relations, then retrieves the rows and columns
              that represents the query.
            </p>
            <p className={styles.answer}>
              SQL servers can be upgraded "Vertically", which means increasing
              server capacities RAM, Storage, CPU etc. Since, all the tables
              should be present at the same machine.
            </p>
            <h2>NoSQL</h2>
            <p className={styles.answer}>
              NoSQL doesn’t involve storing data in separate tables or
              maintaining any relation between them. There is no need to
              predefine a structure of the data. NoSQL simply stores the data in
              a key-value pair by indexing them uniquely. NoSQL is actually{" "}
              <strong>Document based database</strong> which means all the
              necessary information fields / columns will be stored in a single
              document/row. Since, it doesn’t require to maintain any structured
              data tables or any relation between tables, it requires far less
              maintenance than SQL.
            </p>
            <p className={styles.answer}>
              NoSQL servers can be upgraded "Horizontally", which means, simply
              buying more server machines. Since, there is no table or any
              relation between them, it doesn’t require to all the collections
              storing in the same machine.o
            </p>
          </div>
        </div>
        <div className={styles.singleBlog}>
          <h1>2. What is JWT, and how does it work?</h1>
          <p className={styles.answer}>
            JWT stands for <strong>JSON Web Token</strong>. JWT is the result of
            hashing a valid JSON string using a secret key and a proper hashing
            algorithm. In short, JWT is a hashed string. A JWT has three
            portions separated by two periods (.). They are — 1) Header, 2)
            Payload, 3) Signature.
          </p>
          <p className={styles.answer}>
            The header section contains the hash of the JSON which carries the
            information of the hashing algorithm, which hash algorithm was used.
            Payload sections contains the hash of the JSON string. Lastly, the
            signature contains the hash of the secret key, which is bounded to
            other portions.
          </p>
          <p className={styles.answer}>
            If header or payload changes, the signature is no more valid. If any
            of the character in the hash is altered, the token is no longer
            valid. JWT is mostly used for **Authorization purpose**. After
            successful authentication, a JWT is issued from the server. Then, to
            access each protected API end point of the server, the token must be
            sent with the Request. The secret key is stored in the server, only
            server can validate and decode the token, and then send response
            based on the information retrieved from the token.
          </p>
        </div>

        <div className={styles.singleBlog}>
          <h1>3. What is the difference between JavaScript and NodeJS?</h1>
          <p className={styles.answer}>
            JavaScript is an interpreted, high level, prototype based functional
            programming language. Mostly used in Web technology.
          </p>
          <p className={styles.answer}>
            On the other hand, NodeJS is a runtime for JavaScript. It can
            execute JavaScript code outside browser.
          </p>
          <p className={styles.answer}>
            Years ago, JavaScript ould only be executed in a web browser. Web
            browsers are designed to execute JavaScript code on user interaction
            or some event. NodeJS is almost the same identical mechanism for
            executing / running a JavaScript code, but outside the browser.
          </p>
          <p className={styles.answer}>
            By outside the browser, it means in supported operating systems,
            consoles etc. The slight difference is, NodeJS executes JavaScript
            code in the context of the operating system, environment or the
            console. It can access the CPU usage, File System or resources
            available in the machine.
          </p>
        </div>
        <div className={styles.singleBlog}>
          <h1>4. How does NodeJS handle multiple requests at the same time?</h1>
          <p className={styles.answer}>
            NodeJS handles multiple requests at the same time, by queuing the
            requests in Event Queue. Event Loop is the listener of the Event
            Queue which listens to the request resolving event. It is an
            infinite loop, which keeps iterating through Event Queue o listen if
            any request is resolved. By storing requests in Event Queue, NodeJS
            is always ready to receive multiple requests at same time{" "}
            <strong>
              without blocking the I / O (Input / Output) operation
            </strong>
            .{" "}
          </p>
        </div>
      </div>
    </Container>
  );
}
