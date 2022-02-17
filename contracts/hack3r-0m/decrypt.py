def decrypt(flag):
    for i in range(len(flag) - 1, -1, -1):
        singleDecrypt(flag, i)
        if i > 0:
            flag[i] ^= flag[i-1]
    return flag


def singleDecrypt(flag, i):
    flag[i] = arr[flag[i]]
    return flag


def encrypt(flag):
    for i in range(len(flag)):
        if i > 0:
            flag[i] ^= flag[i-1]
        flag[i] ^= flag[i] >> 4
        flag[i] ^= flag[i] >> 3
        flag[i] ^= flag[i] >> 2
        flag[i] ^= flag[i] >> 1
    return flag


def singleEncrypt(flag):
    flag[0] ^= flag[0] >> 4
    flag[0] ^= flag[0] >> 3
    flag[0] ^= flag[0] >> 2
    flag[0] ^= flag[0] >> 1
    return flag


def createDecipherMap():
    m = [None] * 256
    for i in range(256):
        inp = bytearray(i.to_bytes(1, 'big'))
        res = singleEncrypt(inp)[0]
        m[res] = i
    return m


arr = createDecipherMap()

encrypted = "6e3c5b0f722c430e6d324c0d6f67173d4b1565345915753504211f"
decrypted = decrypt(bytearray.fromhex(encrypted))
result = decrypted.decode(encoding="utf-8")
encrypted_check = encrypt(decrypted)
if encrypted_check.hex() == encrypted:
    print("result:", result)
else:
    print("fail :(")
