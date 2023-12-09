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
			profile: [],
			solicitudProfile:[]
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
					localStorage.setItem("user", JSON.stringify(data.user));
					setStore({
						token: data.token,
						user: data.user,
					});
            
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

			resetPassword: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/reset-password`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					});

					if (response.status === 200) {
						const data = await response.json();
						console.log("Respuesta de resetPassword:", data);
						return response.status;
					} else {
						console.error("Solicitud de restablecimiento de contraseña fallida");
						return response.status;
					}
				} catch (error) {
					console.error("Error al procesar la solicitud de restablecimiento de contraseña", error);
					throw error;
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
			addSolicitud : async(solicitud) =>{
				let store = getStore()
				try {
					let  response =  await fetch(`${process.env.BACKEND_URL}/addsolicitud`, {
						headers:{
							Authorization: `Bearer ${store.token}`
						},
						method : "POST",
						body: solicitud
					})
					if (response.status == 200){
						console.log("solicitud agregada")
					}else{
						console.log("no se agrego")
					}
					return response.status
				} catch (error) {
					console.log(error);
				}
			},
			getSolicitudProfile: (userid, id)=>{
				fetch(`${process.env.BACKEND_URL}/getprofile/${userid}/${id}`)
				.then(res => res.json())
				.then(data => setStore({
					solicitudProfile : data
				}))
			}
		}
	}
}

export default getState;
