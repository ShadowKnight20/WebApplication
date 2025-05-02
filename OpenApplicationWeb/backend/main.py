from flask import request, jsonify
from config import app, db
from models import Contact

from OpenverseAPIClient import OpenverseClient



@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include the first name, last name and email"}),
            400,
        )
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "User created!"}), 201
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    db.session.commit()
    return jsonify({"message": "User updated"}), 200
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

ov_client = OpenverseClient()

@app.route("/search_images", methods=["GET"])
def search_images():
    """
    Endpoint to search for images using the OpenVerse API
    Query parameters:
    - q: Search query (required)
    - page: Page number (default: 1)
    - page_size: Results per page (default: 20)
    - license: Filter by license type
    - creator: Filter by creator
    - tags: Comma-separated list of tags
    - type: Filter by image type (e.g., photo, illustration, icon)
    - sort: Sort by relevance or date
    - size: Filter by image size (small, medium, large)
    - date_range: Filter by date range (e.g., last week, last month, last year)
    """
    query = request.args.get("q")
    if not query:
        return jsonify({"error": "Search query is required"}), 400

    page = request.args.get("page", 1, type=int)
    page_size = request.args.get("page_size", 20, type=int)
    license_type = request.args.get("license")
    creator = request.args.get("creator")
    tags = request.args.get("tags")
    image_type = request.args.get("type")
    sort = request.args.get("sort", "relevance")
    size = request.args.get("size")
    date_range = request.args.get("date_range")

    # Handle tags as a comma-separated list
    if tags:
        tags = tags.split(",")

    # Build the filters for the OpenVerse API
    filters = {
        "query": query,
        "page": page,
        "page_size": page_size,
        "license": license_type,
        "creator": creator,
        "tags": tags,
        "type": image_type,
        "sort": sort,
        "size": size,
        "date_range": date_range,
    }

    # Remove any filters with None values
    filters = {key: value for key, value in filters.items() if value is not None}

    try:
        # Perform the search with the filters
        results = ov_client.search_images(**filters)

        if not results:
            return jsonify({"error": "No results found"}), 404

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)