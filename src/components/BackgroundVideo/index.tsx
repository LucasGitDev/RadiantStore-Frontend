import './BackgroundVideo.css'

const videoLink = "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt714eaee50b90fc27/62cc7dcc6a8fb133b0ff7e55/VALORANT_ANNO22_SHATTERED_16x9_27s.mp4"
const BackgroundVideo = ({children}: {children: any})=> {
    return (
      <div className="background-video">
        <div className="overlay"></div>
        <video autoPlay loop muted src={videoLink} />
        <div className="content">
          {children}
        </div>
      </div>
    );
}

export default BackgroundVideo