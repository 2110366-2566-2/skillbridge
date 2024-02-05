"use client"
import { getData, sendMessage, person } from "./serveraction";
import { useState } from "react";

const apiUrl = "http://localhost:3000/api";

export default function Home() {
	const init: person[] = []
	const [data, setData] = useState<person[]>(init);
	const [input, setInput] = useState<string>("");
	

	return <>
		{
			data? 
			<table>
			{data.map((person, index) => {
				return (<tr key={index}>
					<td>{person.name}</td>
					<td>{person.age}</td>
				</tr>)
			})}
			</table> : <></>
		}

		<button 
			onClick={async () => {
				const nextData = await getData();

				console.log(nextData);
				
				setData(nextData);
			}}
		>
		get data from backend via server action function
		</button>

		<br/>
		<br/>

		<input 
			type="text" 
			value={input}
			onChange={(e) => { setInput(e.target.value) }}
		/> <br/>
		<button
			onClick={async () => {
				await sendMessage(input)
			}}
		>pass message to server via server action function</button>

		<br />
		<br />

		<button
			onClick={async () => {
				const response = await fetch(apiUrl);
				if (!response.ok) {
					console.log("asd")
				}
			}}
		>fetch api</button>

	</>;
}
