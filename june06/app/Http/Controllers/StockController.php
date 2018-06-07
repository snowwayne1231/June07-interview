<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use DB;

class StockController extends BaseController
{

    const URL = 'http://api.intrinio.com/historical_data?identifier=QCOM&item=adj_close_price&start_date=2017-06-06&end_date=2018-06-06&frequency=daily&page_size=365';

    const identifier = 'QCOM';
    const item = 'adj_close_price';
    const start_date = '2017-06-06';
    const end_date = '2018-06-06';
    const page_size = 365;

    const table_company = 'companys';
    const stock_talbe = 'stock';

    public function show( Request $request )
    {
        $data = ['status'=>1,'data'=>[]];

        $company_talbe = DB::table(self::table_company);
        

        $company = $company_talbe->where('identifier',self::identifier)->first();
        
        if( isset($company) ){

            $data['data'] = $this->getStockWithCID( $company->id );
            // dd($data);
        }else{

            $client = new Client();

            $stock_talbe = DB::table(self::stock_talbe);

            $response = $client->request('GET', self::URL, [
                'auth' => ['', '']
            ]);

            if($response->getStatusCode()==200){

                $body = $response->getBody();
                $new = json_decode($body, true);
    
                $identifier = $new['identifier'];
                $item = $new['item'];

                $company_id = $company_talbe->insertGetId([
                    'name' => $identifier,
                    'identifier' => $identifier,
                    'item' => $item
                ]);
                
                $data['data'] = $new['data'];

                // $stock_talbe->where();
                // foreach($data['data'] as $val){
                // 固定資料先不用匹配
                
                $insert_data = $data['data'];

                foreach($insert_data as &$val){
                    $val['company_id'] = $company_id;
                }

                $stock_talbe->insert( $insert_data );



            }else{
                $data['status'] = 0;
            }
        }

        // $response = $client->request('GET', self::URL, [
        //     'form_params' => [
        //         'item' => self::item,
        //         'identifier' => self::identifier,
        //     ]
        // ]);
        

        return $data;
    }


    private function getStockWithCID( $id ){

        $stock_talbe = DB::table(self::stock_talbe);

        $res = $stock_talbe->select(['date','value'])->where( 'company_id',$id )->get()->toArray();

        return $res;

    }
}
