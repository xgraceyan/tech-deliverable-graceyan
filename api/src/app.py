from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import TypedDict


from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/api/quote", status.HTTP_303_SEE_OTHER)

@app.get("/quote")
async def read_quote(min_t: str | None = None):
    """
    Retrieves quotes based on a mininum time (all quotes during or after that timestamp).
    """
    quotes_list = []
    if min_t:
        quotes_list = [item for item in database["quotes"] if datetime.fromisoformat(item["time"]) >= datetime.fromisoformat(min_t)]
    else:
        quotes_list = database["quotes"]
    return sorted(quotes_list, key=lambda item: datetime.fromisoformat(item["time"]), reverse=True)