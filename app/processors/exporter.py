# Export dataframe to specified format

from .combine import combine_files
from fastapi.responses import StreamingResponse
from io import StringIO, BytesIO


async def export_to_csv(files):
    data = await combine_files(files)

    # Writes df to CSV text into file like object
    buffer = StringIO()
    data.to_csv(buffer, index=False)
    buffer.seek(0) # Moves back to start for sending

    # Send data as downloadable file
    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=merged.csv"
        }
    )

async def export_to_excel(files):
    data = await combine_files(files)

    # Writes df to CSV text into file like object
    buffer = BytesIO()
    data.to_excel(buffer, index=False, engine='openpyxl')
    buffer.seek(0)

    # Send data as downloadable file
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": "attachment; filename=merged.xlsx"
        }
    )