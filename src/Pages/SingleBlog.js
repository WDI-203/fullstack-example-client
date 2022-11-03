import { useEffect, useState } from "react"

const SingleBlog = (props) => {
	const {urlEndpoint} = props
	const [newBlogs, setNewBlogs] = useState([])
	const [singleBlog, setSingleBlog] = useState({})
	const [id, setId] = useState("ef9043a4-00a3-49af-bd53-2b7a58ae26c8")

	useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all`);
      const fetchedBlogsPayload = await result.json();
      console.log(fetchedBlogsPayload);
      setNewBlogs(fetchedBlogsPayload.blogs);
    };
    fetchBlogs();
  }, []);

	useEffect(()=>{
		const fetchBlog = async () => {
			console.log("fetch blog")
			console.log("Id: ", id)
			const result = await fetch(`${urlEndpoint}/blogs/get-one/${id}`)
			const blogPayload = await result.json()
			setSingleBlog(blogPayload.blog)
		}
		fetchBlog()
	}, [id])

	console.log("ID outside of jsx ", id)

	return (
		<div>
			Single Blog
			<p>{singleBlog.title}</p>
			<p>{singleBlog.id}</p>
			<p>{singleBlog.text}</p>
			<input value={id} type="text" onChange={(e)=>{
				setId(e.target.value)
			}}/>
			<br/>
			<select value={id} onChange={(e)=>{
				setId(e.target.value)
			}}>
				<option></option>
				{newBlogs.map((blog, index)=>{
					return <option key={index}>{blog.id}</option>
				})}
			</select>
			<hr/>
		</div>
	)
}

export default SingleBlog