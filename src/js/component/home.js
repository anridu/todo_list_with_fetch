import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

let TaskList = props => {
	const [items, setItems] = useState([]);
	let [inputValue, setInputValue] = useState("");

	useEffect(
		() =>
			// here i fetch my todos from the API
			fetch("https://assets.breatheco.de/apis/fake/todos/user/Angel3")
				.then(r => r.json())
				.then(data => {
					setItems(data);
				}) //here it re-set the variable tasks with the incoming data
				.catch(function(error) {
					console.log(
						"Hubo un problema con la petición Fetch:" +
							error.message
					);
				}),
		[]
	);
	useEffect(
		function(element) {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/Angel3", {
				method: "PUT",
				body: JSON.stringify(items),
				headers: {
					"Content-type": "application/json"
				}
			})
				.then(response => response.json()) // convert to json
				.then(data => {
					console.log(data);
					setInputValue("");
				})
				.catch(err => {
					console.log("Request Failed", err);
				}); // Catch errors
		},
		[items]
	);
	const enviarFormulario = event => {
		event.preventDefault();
		if (inputValue !== "") {
			let tempList = items.concat({
				label: inputValue,
				done: false
			});
			setItems(tempList);
		}
		//console.log("estoy dentro de la funcion");
	};
	const removeItem = event => {
		let liSelected = event.target.parentElement;
		let words = liSelected.innerText.split(" ");
		let value = words[0];
		let newItems = items.filter(item => item.label !== value);
		console.log(newItems);
		setItems(newItems);
		//setItems(items.splice(event, 3));
		//setInputValue("");
	};

	return (
		<div>
			<form onSubmit={event => enviarFormulario(event)}>
				<input
					value={inputValue}
					placeholder={"Fill with the new task"}
					onChange={e => setInputValue(e.target.value)}
				/>
			</form>

			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{item.label}{" "}
						<span onClick={event => removeItem(event)}>X</span>
					</li>
				))}
			</ul>
		</div>
	);
};

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>

			<TaskList />
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
}
TaskList.propTypes = {
	newElement: PropTypes.string
};
