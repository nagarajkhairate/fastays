from flask import Flask
app = Flask(__name__)

@app.route('/new')
def new_route():
    return 'This is a new route!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
