-- Created By LovelyJacob

---@param Number number Number to be formatted.
---@return string FormattedNumber The formatted number.
local function FormatNumber(Number)
    if type(Number) ~= "number" then
        error("Invalid argument provided. Expected number, received " .. type(Number) .. ".")
    end
    local String = tostring(Number)
    local FormattedString = ''
    local Passed = 0
    for Index = String:len(), 1, -1 do
        local Character = String:sub(Index, Index)
        FormattedString = Character .. FormattedString
        if tonumber(Character) ~= nil then
            Passed = Passed + 1
            if Passed == 3 then
                Passed = 0
                if Index ~= 1 then
                    FormattedString = "," .. FormattedString
                end
            end
        else
            Passed = 0
        end
    end
    return FormattedString
end

print(FormatNumber(-10000000000000000))
