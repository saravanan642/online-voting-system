from flask import Flask, request, jsonify
import face_recognition
import base64
import numpy as np
import cv2

app = Flask(__name__)

def decode_image(b64):
    img_data = base64.b64decode(b64)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

@app.route("/match-face", methods=["POST"])
def match_face():
    aadhaar_img = decode_image(request.json["aadhaar"])
    live_img = decode_image(request.json["live"])

    aadhaar_enc = face_recognition.face_encodings(aadhaar_img)
    live_enc = face_recognition.face_encodings(live_img)

    if not aadhaar_enc or not live_enc:
        return jsonify({
            "status": False,
            "message": "Face not detected"
        })

    result = face_recognition.compare_faces(
        [aadhaar_enc[0]],
        live_enc[0]
    )

    return jsonify({
        "status": bool(result[0])
    })

if __name__ == "__main__":
    app.run(port=6000)
