import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/BlogLandingPage";
import BlogPostView from "./pages/Blog/BlogPostView";
import PostByTags from "./pages/Blog/PostByTags";
import SearchPosts from "./pages/Blog/SearchPosts";
import AdminLogin from "./pages/Admin/AdminLogin";
import PrivateRoutes from "./routes/PrivateRoutes";
import Dashboard from "./pages/Admin/Dashboard";
import BlogPost from "./pages/Admin/BlogPost";
import BlogPostEditor from "./pages/Admin/BlogPostEditor";
import Comments from "./pages/Admin/Comments";
import UserProvider from "./context/userContext";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<BlogLandingPage />} />
            <Route path="/:slug" element={<BlogPostView />} />
            <Route path="/tag/:tagName" element={<PostByTags />} />
            <Route path="/search" element={<SearchPosts />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/posts" element={<BlogPost />} />
              <Route path="/admin/create" element={<BlogPostEditor />} />
              <Route
                path="/admin/edit/:postSlug"
                element={<BlogPostEditor isEdit={true} />}
              />
              <Route path="/admin/comments" element={<Comments />} />
            </Route>

            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "14px",
            },
          }}
        />
      </UserProvider>
    </>
  );
}

export default App;
