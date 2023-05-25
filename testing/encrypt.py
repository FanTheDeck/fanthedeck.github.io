import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import json
import sys

key = input("Enter 16 byte long key: ").encode()
iv = b''
for i in [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]:
    iv += i.to_bytes(1, 'big')

print("Enter list of keys: ")

keyList = []

while True:
    line = sys.stdin.readline()
    if line.strip() == '':
        break
    keyList.append(line.strip())

keyList = json.loads(''.join(keyList))

def encrypt(steamKey):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    plaintext = steamKey.encode()
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
    return base64.b64encode(ciphertext).decode()

for game in keyList:
    game[1] = encrypt(game[1])

print(json.dumps(keyList))