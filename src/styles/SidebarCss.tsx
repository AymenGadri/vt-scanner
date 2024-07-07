const Styles = ({
    list: {
        flex:1,
        width: 250,
        height: '100vh', 
        backgroundColor: '#252830',
        display: 'flex',
        flexDirection: 'column' as const, 
        marginTop:'20px',
        
    },
    bottomList: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column' as const,
    },
    text: {
        color:"#fff",
        fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
    }
});

  export default Styles;