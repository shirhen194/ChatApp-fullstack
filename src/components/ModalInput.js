import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";



function ModalInput(props) {
  let { handleClose, addMessage, rec, pic, vid, c_id, type } = props;
  async function getRec() {
    return new MediaRecorder(await navigator.mediaDevices.getUserMedia({audio: true}))
  }
  
  const [nowRecording, setNowRecording] = useState(false);
  const [audio, setShowAudio] = useState("hide-rec");
  const [blink, setBlink] = useState("");
  const [audioRec, setAudioRec] = useState(null);
  const [content, setContent] = useState('');


  useEffect(() => {
    if (audioRec === null) {
      if (nowRecording) {
        getRec().then(setAudioRec, console.error);
      }
      return
    }

    if (nowRecording) {
      audioRec.start();
      setBlink("blink");
    } else {
      setBlink("");
      audioRec.stop();
    }

    const afterStrartRecording = e => {
      setContent(URL.createObjectURL(e.data));
      setShowAudio("show-rec")
    }

    audioRec.addEventListener("dataavailable", afterStrartRecording)
    return () => audioRec.removeEventListener("dataavailable", afterStrartRecording)
  }, [audioRec, nowRecording]);

  return (
    <div>
      <Modal show={rec || vid || pic} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Send&nbsp;
            {rec && <span>Recording</span>}
            {pic && <span>Image</span>}
            {vid && <span>Video</span>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Send&nbsp;
                {rec && <span>Recording</span>}
                {pic && <span>Image</span>}
                {vid && <span>Video</span>}</Form.Label> */}
              {rec && recordingInput()}
              {pic && imageInput()}
              {vid && videoInput()}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            addMessage(content, c_id, type, props.contactId);
            handleClose()
          }}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  function recordingInput() {
    return <div className="audio-wrap">
      <audio className={audio} src={content} controls />
      <button className={"rec-button " + blink} onClick={() => setNowRecording(true)} disabled={nowRecording}>
        <img src="mic.png" alt="start recording" />
        start
      </button>
      <button className="rec-button" onClick={() => setNowRecording(false)} disabled={!nowRecording}>
        <img src="stop.png" alt="stop recording" />
        stop
      </button>
    </div>;
  }

  function imageInput() {
    return (
      <div className="image-wrap">
        {content && (
          <div>
            <img src={content} alt="pic" style={{ width: '20vh', height: '20vh' }} />
            <Button variant="secondary" onClick={() => setContent(null)} style={{margin: '2vh'}}>
            <img className="remove-img" src="trash.png" alt="Remove" onClick={() => setContent(null)} /> Remove
            </Button>
          </div>
        )}
        <Form.Control type="file" onChange={(event) => {
          setContent(URL.createObjectURL(event.target.files[0]));
        }} />
      </div>);
  }

  function videoInput() {
    return (
      <div className="video-wrap">
        {content && (
          <div>
            <video src={content} alt="vid" style={{ width: '50vh'}} controls />
            <Button variant="secondary" onClick={() => setContent(null)} style={{margin: '2vh'}}>
            <img className="remove-img" src="trash.png" alt="Remove" onClick={() => setContent(null)} /> Remove
            </Button>
          </div>
        )}
        <Form.Control type="file" onChange={(event) => {
          setContent(URL.createObjectURL(event.target.files[0]));
        }} />
      </div>);
  }
}

export default ModalInput;