export const analyseFilters = (filters: string) => {
    const decodedFilters = Buffer.from(filters, 'base64').toString();
    const jsonFilters = JSON.parse(decodedFilters);

    return jsonFilters;
};

export const formatCategory = (category: any): string => {
    if (!category) return "";

    return category.parent ? formatCategory(category.parent) + "/" + category.name : category.name;
};