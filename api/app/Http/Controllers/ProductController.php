<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data=json_decode($data['products'],true);
        if (is_array($data)) {    
            try {
                foreach ($data as $productData) {
                    $existed=Product::where('name',$productData['name'])->first();
                    if($existed) {
                        $existed->fill($productData);
                        $existed->save();
                        continue;
                    }
                    Product::create($productData);
                }
                return response('Created', 201);
            } catch (\Exception $e) {
                // Handle any exceptions or errors (e.g., database errors)
                return response('Failed', 500);
            }
        }
        return response("Failed", 500);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $data=Product::find($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $productId = (int) $id;
        $update = $request->all();
        $update['image']=json_decode($update['image'],true);
        $product = Product::find($productId);
    
        if (!$product) {
            return response("Not found", 404);
        }
    
        // Use the update method on the model instance
        $product->fill($update);
        $product->save();
    
        return response("Updated",200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $data=Product::find($id);
        if(!$data) return response("Not found", 404);
        $data->delete();
        return response("Deleted", 200);
    }
}
