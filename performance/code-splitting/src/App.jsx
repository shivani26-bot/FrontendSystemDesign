import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
// import { About, Contact, FAQs, Profile, Login } from "./pages";
import { lazy, Suspense } from "react";


const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Login = lazy(() => import("./pages/Login"));

// const isAuthenticated = false;
const isAuthenticated = true;
export const PrivateRoutes = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="profile"
          element={
            <Suspense fallback={<>...</>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<>...</>}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<>...</>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="faqs"
          element={
            <Suspense fallback={<>...</>}>
              <FAQs />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<>...</>}>
              <Login />
            </Suspense>
          }
        />

        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// code splitting based on routes 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default App;

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="profile" element={<Profile />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="about" element={<About />} />
//         <Route path="faqs" element={<FAQs />} />
//         <Route path="login" element={<Login />} />

//         <Route path="/*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default App;


// Article:
// https://javascriptpatterns.vercel.app/patterns/performance-patterns/introduction
// https://dev.to/franklin030601/code-splitting-in-react-js-4o2g
// https://www.patterns.dev/vanilla/bundle-splitting/