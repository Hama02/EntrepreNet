/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "../../../axios";
import Pagination from "@mui/material/Pagination";
import { Dropdown } from "primereact/dropdown";

const Posts = ({ domain, refresh, setRefresh }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url =
        domain !== ""
          ? `/posts?page=${page}&limit=${limit}&domain=${domain.name.replace(
              / /g,
              "_"
            )}`
          : `/posts?page=${page}&limit=${limit}`;
      const res = await axios.get(url);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setPosts([]);
      console.log(err);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(e.value);
    setPage(1);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, limit, domain, refresh]);

  return (
    <>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="posts">
          {posts?.map((p) => (
            <Post post={p} key={p._id} setRefresh={setRefresh} />
          ))}
          <div className="pagination-container">
            <Pagination
              style={{ margin: "0 auto" }}
              count={totalPages}
              page={page}
              color="primary"
              onChange={handleChangePage}
            />
            <Dropdown
              value={limit}
              onChange={handleLimitChange}
              options={[5, 10, 15]}
              placeholder="Select a City"
              className="dropdown"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Posts;
