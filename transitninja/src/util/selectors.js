const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const { latitude, longitude } = position.coords;

      this.setState({
        user_location: {latitude, longitude}
      });
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
}
