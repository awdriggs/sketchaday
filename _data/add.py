from datetime import datetime
import yaml

# Path to the sketches.yml file
YML_FILE = "sketches.yml"  # <-- Change this to your actual path!

def load_sketches():
    """Load existing sketches from YAML file."""
    try:
        with open(YML_FILE, "r", encoding="utf-8") as file:
            return yaml.safe_load(file) or []
    except FileNotFoundError:
        return []  # If file doesn't exist, start fresh

def add_new_day(sketches):
    """Add today's date in the required format at the top of the file."""
    today = datetime.today()
    date_str = today.strftime("%m%d%Y")  # MMDDYYYY format

    new_entry = {
        "title": f"d{date_str}",
        "date": f"{today.strftime('%Y-%m-%d')}",  # YYYY-MM-DD format
        "thumbnail": "thumb.png",
        "path": f"sketches/d{date_str}/"
    }

    # Check if today's entry already exists
    if any(entry["date"] == new_entry["date"] for entry in sketches):
        print("✅ Today's entry already exists. No update needed.")
    else:
        sketches.insert(0, new_entry)  # Insert at the top instead of appending
        with open(YML_FILE, "w", encoding="utf-8") as file:
            yaml.dump(sketches, file, default_flow_style=False, sort_keys=False)
        print(f"✅ Added new entry for {new_entry['date']} at the top.")

if __name__ == "__main__":
    sketches = load_sketches()
    add_new_day(sketches)

