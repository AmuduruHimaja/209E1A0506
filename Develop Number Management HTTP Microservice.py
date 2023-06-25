import requests
from flask import Flask, jsonify, request
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse, parse_qs
from time import time

app = Flask(_name_)

def fetch_numbers(url):
    try:
        response = requests.get(url, timeout=0.5)
        if response.ok:
            data = response.json()
            return data.get("numbers", [])
    except requests.exceptions.RequestException as e:
        print("Request Exception:", e)
    
    return []

def merge_unique_numbers(url_list):
    start_time = time()
    results = []

    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetch_numbers, url) for url in url_list]

        for future in futures:
            if time() - start_time > 0.5:
                break
            numbers = future.result()
            if numbers:
                results.extend(numbers)

    return sorted(list(set(results)))

@app.route("/numbers")
def get_numbers():
    urls = request.args.getlist("url")
    numbers = merge_unique_numbers(urls)
    response = {"numbers": numbers}
    return jsonify(response)

if _name_ == "_main_":
    app.run(host='0.0.0.0', port=8008)
