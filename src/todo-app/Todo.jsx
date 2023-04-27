import React, { useEffect, useState } from "react";
import "./todo.css";
import image from "../images/to-do-list.png";

const localStorageData = () => {
	const Data = localStorage.getItem("Todo Items");
	if (Data) {
		return JSON.parse(Data);
	} else {
		return [];
	}
};

const Todo = () => {
	const [inputData, setInputData] = useState();
	const [item, setItem] = useState(localStorageData());

	const addItem = () => {
		if (!inputData) {
		} else {
			setItem([...item, inputData]);
			setInputData("");
		}
	};

	const deleteItem = (id) => {
		const updateData = item.filter((val, index) => {
			return index !== id;
		});

		setItem(updateData);
	};

	useEffect(() => {
		localStorage.setItem("Todo Items", JSON.stringify(item));
	}, [item]);

	return (
		<>
			<div className="container flex">
				<div className="todo-app">
					<div className="logo flex">
						<img src={image} alt="Todo Image" />
						<span>add your list here ✌</span>
					</div>

					<div className="input-container">
						<input
							type="text"
							placeholder="Add Item..."
							onChange={(e) => {
								setInputData(e.target.value);
							}}
							value={inputData}
						/>
						<span className="plus-icon">
							<i className="fa-solid fa-plus" onClick={addItem}></i>
						</span>
					</div>

					<div className="list-items">
						<ul>
							{item.map((val, index) => {
								return (
									<li className="item flex" key={index}>
										<p>{val}</p>
										<i
											className="fa-solid fa-trash-can"
											onClick={() => {
												deleteItem(index);
											}}
										></i>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="btn-container">
					<button onClick={() => setItem([])}>Remove All</button>
				</div>
			</div>
		</>
	);
};

export default Todo;
