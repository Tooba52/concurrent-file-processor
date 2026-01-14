# Merge all dataframes and return

import pandas as pd
from .concurrency import concurrently_read

async def combine_files(files):
    dataframes = await concurrently_read(files)
    combined_dfs = dataframes[0]

    # Merge each remaining dataframe
    combined_dfs = pd.concat(dataframes, ignore_index=True, sort=False) 

    return combined_dfs


        




