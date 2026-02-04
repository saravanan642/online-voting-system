import cv2, pytesseract, re, sys

entered = sys.argv[1].upper()

img = cv2.imread("uploads/voter.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

text = pytesseract.image_to_string(gray).upper()
text = text.replace(" ", "")

ids = re.findall(r"[A-Z]{3}[0-9]{7}", text)

if entered in ids:
    print("MATCH")
else:
    print("NOT_MATCH")
