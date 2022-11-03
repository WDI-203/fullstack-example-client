import { useState } from "react";

const CreateBlogForm = (props) => {

	const {urlEndpoint, setShouldRefetch} = props

	const [title, setTitle] = useState("")
	const [text, setText] = useState("")
	const [author, setAuthor] = useState("")
	const [category, setCategory] = useState("")
	const [categories, setCategories] = useState([])
	const [successMessage, setSuccessMessage] = useState("")

	const handlePostBlog = async () => {
		setShouldRefetch(true)
		setSuccessMessage("")
		const response = await fetch(`${urlEndpoint}/blogs/create-one`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json' // This Content-Type flag is used to tell the server that our request body should be parsed as a JSON object.
			},
			body: JSON.stringify({
				title,
				text,
				author,
				categories
			})
		})
		setShouldRefetch(false)
		if (response.ok !== true) {
			setSuccessMessage("There was a network problem creating the blog")
			return;
		}
		const payload = await response.json()
		if (payload.success !== true) {
			setSuccessMessage(`There was a server problem creating the blog. Error: ${payload.error}`)
			return;
		}
		setSuccessMessage("Successfully created the blog")
	}

	return (
		<div>
			<h1>Create Blog Form</h1>
			<h2>{successMessage}</h2>
			<label>Title</label>
			<input type="text" onChange={(e)=>{
				setTitle(e.target.value)
			}}/>
			<br/>
			<label>Author</label>
			<input type="text" onChange={(e)=>{
				setAuthor(e.target.value)
			}}/>
			<br/>
			<label>Text</label>
			<textarea onChange={(e)=>{
				setText(e.target.value)
			}}/>
			<br/>
			<label>Category</label>
			<input type="text" onChange={(e)=>{
				setCategory(e.target.value)
			}}/>
			<button onClick={()=>{
				const newCategories = [...categories, category]
				setCategories(newCategories)
			}}>Add Category</button>
			<br/>
			<button onClick={()=>{
				handlePostBlog()
			}}>Create Blog</button>
			<hr/>
		</div>
	)
}

export default CreateBlogForm