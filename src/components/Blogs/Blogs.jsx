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
        <div className={styles.singleBlog}>
          <h1>
            1. What are the different ways to manage a state in a React
            application?
          </h1>
          <div className={styles.answer}>
            <p className={styles.answer}>
              There are four kinds of React States to Manage -- <br /> 1. Local
              State , 2. Global State , 3. Server State , 4. URL State{" "}
            </p>
            <h2>Local State</h2>
            <p className={styles.answer}>
              Local States are states declared in a component. Using useState or
              useReducer can be used to manage this with ease.
            </p>
            <p className={styles.answer}>
              useState can manage only one state value at a time. The state
              value can be primitive or non-primitive. It provides the initial
              state and a dispatcher function to alter the state.
            </p>
            <p className={styles.answer}>
              On the other hand, useReducer is the advanced version of useState.
              Instead of only an initial state, it can also receive a reducer
              which is very similar to the reducer function we pass to an
              Array.prototype.reduce() method. The reducer is simply a function,
              which holds the logic of altering the states. These states are
              stored in an accumulator. Whenever a dispatcher provided by the
              reducer is executed, it actually accumulates those new states.
            </p>
            <h2>Global State</h2>
            <p className={styles.answer}>
              There are some popular third-party tools for managing states
              globally across a React application. Such as Redux. This really
              scales a React App high, at ease. There are some similarities with
              useReducer. But Redux has more convenient methods to manage many
              states. A combination of useReducer and Context API may solve this
              Global State managing problem. But it might not be practical in
              the case of a large React App.
            </p>
            <h2>Server State</h2>
            <p className={styles.answer}>
              Since, React only deals with UI, and reacts when a state changes.
              Managing server state via React’s built-in method is quite
              cumbersome. React Query, SWR, etc. third-party packages come to
              play in case of managing server state, without manually updating a
              React state on each loading state while fetching data.
            </p>
            <h2>URL State</h2>
            <p className={styles.answer}>
              React Router DOM is the ultimate package for handling URL states
              in a React App. It can read the client-side URL’s parameters, and
              requests can be sent to the server using those parameters. Hence,
              it becomes easier to load contents dynamically, baed on the URL
              currently being visited.s
            </p>
          </div>
        </div>
        <div className={styles.singleBlog}>
          <h1>2. How does prototypical inheritance work?</h1>
          <p className={styles.answer}>
            When we read a property from an object, and it’s missing, JavaScript
            automatically takes it from the prototype. In programming, this is
            called “prototypal inheritance”.
          </p>
          <p className={styles.answer}>
            A prototype chain is simply some sort of linked list, where the link
            is between objects. Since JavaScript is a purely
            functional/prototype-based programming language, it uses previously
            created object structures as prototypes hence inheriting properties
            and methods.
          </p>
        </div>

        <div className={styles.singleBlog}>
          <h1>3. What is a unit test? Why should we write unit tests?</h1>
          <p className={styles.answer}>
            Unit testing involves testing an individual component, function, or
            class. Writing unit test, allow a developer to check if the
            component works in edge cases. Dealing with edge cases makes any
            piece of code reliable to use in the future while developing an
            extensive application and ensuring re-usability. It might be
            cumbersome while writing a test case for very simple functionality.
            But, in the end, it helps a lot, when it comes to integration tests.
          </p>
        </div>
        <div className={styles.singleBlog}>
          <h1>4. Differences between React vs. Angular vs. Vue</h1>
          <p className={styles.answer}> </p>
          <h2>React</h2>
          <p className={styles.answer}>
            According to React’s official doc, React is a UI library, instead of
            a framework. It doesn’t make the developer maintain a strict project
            structure. There are some automated tools such as CRA
            (create-react-app), Vite, Turbo Pack, etc. for scaffolding a fresh
            React app.
          </p>
          <p className={styles.answer}>
            React maintains a unidirectional data flow, which means, the UI
            states are only propagated from a parent component to its children.
            If a state changes, it re-calculates the DOM based on the new state
            and then renders the calculated DOM. The React name comes from this
            since it reacts to a state change.
          </p>
          <h2>Angular</h2>
          <p className={styles.answer}>
            Angular is a fully-fledged framework. It follows the MVC
            (Model-View-Controller) design pattern. Its most recent version
            doesn’t require following a strict rule of MVC since now it’s
            component-based.
          </p>
          <p className={styles.answer}>
            Each component in Angular contains a Template, a Class that defines
            the application logic, and MetaData (Decorators). The metadata for a
            component tells Angular where to find the building blocks that it
            needs to create and present its view.
          </p>
          <p className={styles.answer}>
            Angular templates are written in HTML but can also include Angular
            template syntax with special directives to output reactive data and
            render multiple elements, among other things.
          </p>
          <h2>Vue</h2>
          <p className={styles.answer}>
            Vue is a progressive framework because its functionality can be
            extended with official and third-party packages, such as Vue Router
            or Vuex, to turn it into an actual framework.
          </p>
          <p className={styles.answer}>
            Components in Vue are small, self-contained, and can be reused
            throughout the application. Single File Components (SFCs) with
            the .vue extension contain HTML, CSS, and JavaScript so that all
            relevant code resides in one file.
          </p>
          <p className={styles.answer}>
            SFCs are the recommended way to organize code in Vue.js projects,
            especially larger ones. Tools such as Webpack or Browserify are
            required to transpile SFCs into working JavaScript code.
          </p>
        </div>
      </div>
    </Container>
  );
}
