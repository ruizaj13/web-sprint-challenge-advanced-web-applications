import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {fetchBubbles as mockFetchBubbles} from '../services/fetchBubbles'

jest.mock('../services/fetchBubbles.js')

test("Fetches data and renders the bubbles", async () => {

  mockFetchBubbles.mockResolvedValueOnce(({
    data:[
      {color: "softpink", code: {hex: "#dd99ba"}, id: 6},
      {color: "bisque", code: {hex: "#dd9a99"}, id: 7}
    ]
  }))

  render(<BubblePage/>)
  
  await waitFor(() => {
    const circles = screen.getAllByTestId('circle')
    expect(circles).toBeTruthy()
  })

});
