class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first;
    # puts "ROOM IS: #{json["room"]}"
    # @student = "blabla"
    if @student.nil?
      head 401
    else
      @currentattendance = CurrentAttendance.new
      @currentattendance.student = @student
      @currentattendance.checkin = Time.now
      if @currentattendance.save!
        head 200
      else
        head 401
      end
    end

  end
end
