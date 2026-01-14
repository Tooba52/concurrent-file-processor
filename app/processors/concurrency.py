# helpers for running multiple files at once

import asyncio
from .loader import upload_file

async def concurrent_processing(files):
    tasks = [upload_file(file) for file in files] #convert all files to dataframes and store
    return await asyncio.gather(*tasks) #runs concurrently 