from seleniumwire import webdriver  # Import from seleniumwire
import gzip
import io
import json
import pandas as pd
bytes = io.BytesIO()

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# cam le
# 203678
# https://shopeefood.vn/da-nang/thuc-pham-sach-thao-nguyen-huynh-ngoc-du
# ngu hanh son
# 123782
# https://shopeefood.vn/da-nang/laban-mart-chau-thi-vinh-te
# hai chau
# 74087
# https://shopeefood.vn/da-nang/shop-rau-qua-yen-tieu-la
# son tra
# 256763
# https://shopeefood.vn/da-nang/chi-thao-trai-cay-si-le-ha-dac
# lien chieu
# 225160
# https://shopeefood.vn/da-nang/tuti-fruit-shop-trai-cay-nhap-khau-da-nang-ton-duc-thang
# thanh khe
# 128317
# https://shopeefood.vn/da-nang/sieu-thi-co-op-mart-da-nang

supplierId = '203678'
linkWeb = 'https://shopeefood.vn/da-nang/thuc-pham-sach-thao-nguyen-huynh-ngoc-du'

# Go to the Google home page
driver.get(linkWeb)

dataFull = []

# Access requests via the `requests` attribute
for request in driver.requests:
    if request.url.startswith('https://gappapi.deliverynow.vn/api/delivery/get_detail?id_type=2&request_id=' + supplierId):
        resData = request.response.body
        data = json.loads(resData)

        name = data['reply']['delivery_detail']['brand']['name']
        photo = data['reply']['delivery_detail']['photos'][11]['value']
        address = data['reply']['delivery_detail']['address']
        print(name)
        print(photo)
        print(address)
        dataFull.append((supplierId, name, photo, address))

df = pd.DataFrame(dataFull, columns=['id', 'name', 'photo', 'address'])
print(df)
df.to_excel('test.xlsx')
