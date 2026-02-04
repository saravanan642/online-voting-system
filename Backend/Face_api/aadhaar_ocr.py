import cv2, pytesseract, sys, re

entered = sys.argv[1]  # user entered aadhaar

img = cv2.imread("uploads/aadhaar.jpg")

images = [
    img,
    cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE),
    cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
]

for im in images:
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)

    # clean OCR text
    text = text.replace("O","0").replace("I","1")

    # extract all digits
    digits = re.findall(r"\d", text)
    aadhaar_from_image = "".join(digits)

    print("OCR AADHAAR:", aadhaar_from_image)

    # 🔥 FINAL CONDITION
    if entered in aadhaar_from_image:
        print("MATCH")
        sys.exit(0)

print("NOT_MATCH")
