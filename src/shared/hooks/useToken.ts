export default function useToken() {
	const token = localStorage.getItem('access_token');
	return token || "";
}
