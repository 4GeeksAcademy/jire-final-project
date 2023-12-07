const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			],
			ofertas: [],
			solicitudes: [],
			token: localStorage.getItem("token") || null,
			error: null,
			profile: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (user) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})
					return response.status

				} catch (error) {
					console.log(error)
				}
			},
			getSolicitudes: () =>  {
				fetch(`${process.env.BACKEND_URL}/solicitudes`)
					.then(res => res.json())
					.then(data => setStore({
						solicitudes: data
					}))
			},
			getOfertas: () => {
				fetch(`${process.env.BACKEND_URL}/ofertas`)
					.then(res => res.json())
					.then(data => setStore({
						ofertas: data
					}))

			},
			login: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
					});
					
					if (response.status === 200) {
					const data = await response.json();
					localStorage.setItem("token", data.token)
					setStore({
						token : data.token
					})
					return response.status
					} else {
					console.error("Inicio de sesión fallido");
					setStore({
						error: "Email o contraseña incorrecta"
					})
					}
				} catch (error) {
					console.error("Error al procesar la solicitud de inicio de sesión", error);
				}
			},
			logout : () =>{
				localStorage.removeItem("token")
				setStore({
					token:null
				})
			},
			profile : () =>{
				let store = getStore()
				fetch(`${process.env.BACKEND_URL}/profile`,{
					headers:{Authorization: `Bearer ${store.token}`}
				})
				.then(res => res.json())
				.then(data => setStore({
					profile : data
				}))
			},
			addSolicitud : async() =>{
				// try {
				// 	let  response =  await fetch(`${process.env.BACKEND_URL}/addsolicitud`, {
				// 		method : "POST",
				// 		headers:{
				// 			"Content-Type"
				// 		}
				// 	})
				// } catch (error) {
					
				// }
			}
		}
	}
}

export default getState;
