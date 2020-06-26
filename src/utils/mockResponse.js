const mockResponse = () => {
  const res = {}
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res
};

export default mockResponse;
