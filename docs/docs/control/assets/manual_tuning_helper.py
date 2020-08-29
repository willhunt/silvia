import json
import numpy as np
import parse

# Helper functions

def load_silvia_response(filepath, time=[0, -1], input_type="pid"):
    """
    Load measured response from Silvia
    input_type = "step", "pid"
    """
    with open(filepath) as json_file:
        raw_data = json.load(json_file)
        filename = filepath.split("/")[-1]
        t = []
        u = []
        T = []
        if time[1] == -1:
            time[1] = raw_data[-1]["t"]
        
        for index, item in enumerate(raw_data):
            if item["t"] >= time[0] and item["t"] <= time[1]:
                if len(t) == 0:
                    t.append(item["t"])
                else:
                    t.append(item["t"] - t[0])
                u.append(item["duty"])
                T.append(item["T_boiler"])
        data = {
            "t": np.array(t),
            "u": np.array(u),
            "T": np.array(T),
        }
        if input_type == "pid":
            data["K"] = list(parse.parse("silvia_response_data_kp{:g}ki{:g}kd{:g}_v{:d}.json", filename))[:3]
    return data

def load_silvia_responses(filepaths, time=[0, 1000]):
    datasets = []
    for filepath in filepaths:
        datasets.append(load_silvia_response(filepath, time))
    return datasets