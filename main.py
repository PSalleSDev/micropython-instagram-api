from time import sleep
import machine
import network
import urequests
import ujson

led = machine.Pin(2, machine.Pin.OUT)
username = "p3drosalles"
ssid = 'Casa Fred'
password = 'pedro04davi'

def setup():
    connection = network.WLAN(network.STA_IF)
    if connection.isconnected() == True:
        print("Already connected")
    connection.active(True)
    connection.connect(ssid,password)
    while connection.isconnected() == False:
        pass
    print("Connected")
    print(connection.ifconfig())

setup()

while True:
    led.value(1)
    response = urequests.post('https://api.micropython-instagram-api.tk/info', headers={"Content-Type":"application/json"}, data=ujson.dumps({"username":username}))
    res = response.json()
    response.close()
    print('{} have {} followers'.format(username, res['followed_by']))
    led.value(0)
    sleep(5)